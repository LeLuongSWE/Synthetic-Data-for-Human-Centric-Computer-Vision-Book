---
document_title: "Source Map — Synthetic Data for Human-Centric Computer Vision"
version: "1.0"
status: "Nguồn chuẩn đang hoạt động"
updated: "2026-08-29 (UTC+7)"
architecture_version: "1.0"
chapter_count: 26
part_count: 8
appendix_count: 5
---

# Source Map — Synthetic Data for Human-Centric Computer Vision

> **Vai trò của tệp này:** xác định nguồn nào được dùng cho nội dung nào, nguồn đó có đủ thẩm quyền để hỗ trợ loại kết luận nào, khi nào phải kiểm tra lại trên Internet và những suy diễn nào bị cấm. Đây là chỉ mục nguồn của toàn dự án, không phải danh mục tài liệu để đọc tuần tự.

## 1. Mục tiêu cố định của dự án

Cuốn sách phải đưa người đã đọc và sửa được Python, có toán cơ bản nhưng chưa cần biết đồ họa 3D, từ một ảnh người dựng bằng máy đến khả năng:

1. chuyển bài toán thị giác về con người thành yêu cầu dữ liệu có thể kiểm tra;
2. xây bộ sinh ảnh, video và nhãn có kiểm soát;
3. chứng minh ảnh, nhãn, chuyển động và provenance khớp nhau;
4. thiết kế biến thể theo phân bố có chủ đích;
5. huấn luyện và đánh giá mà không làm rò rỉ dữ liệu;
6. dùng dữ liệu thật được giữ riêng để kết luận dữ liệu tổng hợp có ích trong điều kiện nào.

Sản phẩm cuối là **một lập luận thực nghiệm có thể tái tạo**, không phải một bộ ảnh đẹp và cũng không phải một giáo trình Unity, đồ họa máy tính hay deep learning đầy đủ.

Định vị kỹ thuật của dự án là:

> Unity → human models → body-parameter variation → multi-camera → animation → synthetic dataset → 2D/3D pose ground truth.

Đây là specialization gần **Computer Vision, 3D Vision, Perception và simulation**, chưa phải hệ Physical AI end-to-end gồm robotics, control và robot learning.

## 2. Thứ bậc thẩm quyền

Khi hai nguồn mâu thuẫn, dùng thứ tự sau. Nguồn ở hàng trên chỉ thắng trong đúng phạm vi thẩm quyền của nó.

| Bậc | Loại nguồn | Có thẩm quyền đối với | Không tự động có thẩm quyền đối với |
| ---: | --- | --- | --- |
| 1 | Quyết định dự án đã duyệt | Mục tiêu, phạm vi, ví dụ xuyên suốt, cấu trúc chương, quy ước riêng | Sự đúng đắn của toán, API hoặc kết quả thực nghiệm |
| 2 | Code, schema, cấu hình và output thật của dự án | Hệ thống hiện đang làm gì, định dạng thực tế, phiên bản, lỗi có thể tái tạo | Tính tổng quát ngoài cấu hình đã chạy |
| 3 | Paper gốc, đặc tả gốc, tài liệu chính thức đúng phiên bản | Thuật toán, mô hình, quy ước công cụ, protocol và kết quả do nguồn công bố | Kết quả của dự án này nếu chưa tái lập |
| 4 | Sách học thuật có uy tín | Nền tảng toán, hình học, camera, xác suất, phương pháp giải thích | API hiện hành hoặc benchmark mới |
| 5 | Survey và bài tổng quan | Bản đồ lĩnh vực, từ khóa, nhóm phương pháp | Thay thế paper gốc cho một khẳng định cụ thể |
| 6 | Blog, diễn giải thứ cấp | Trực giác hoặc đầu mối tìm nguồn | Kết luận kỹ thuật không hiển nhiên |

### 2.1 Quy tắc xử lý mâu thuẫn

- Quyết định dự án không được dùng để bác bỏ một định lý hoặc đặc tả chính thức.
- Tài liệu công cụ không được dùng để biến quy ước riêng của công cụ thành chân lý toán học.
- Paper chỉ chứng minh kết quả trong dataset, model, metric và protocol đã báo cáo.
- Output chạy được chỉ chứng minh hành vi trong môi trường đã ghi lại.
- Nếu chưa xác định được nguồn nào có thẩm quyền, phải viết **“chưa đủ căn cứ”** và ghi điều cần kiểm tra.

## 3. Trạng thái nguồn

| Mã | Ý nghĩa |
| --- | --- |
| `ACTIVE` | Đã có trong bộ nguồn hiện tại và được phép dùng theo phạm vi ghi trong registry |
| `KNOWN-MISSING` | Đã biết tài liệu tồn tại nhưng tệp chưa có trong bộ nguồn hiện tại |
| `TO-IMPORT` | Nguồn ngoài đã chọn, cần tải bản hợp pháp và nạp vào Project |
| `PIN-VERSION` | Chỉ được nạp sau khi biết phiên bản công cụ hoặc package chính xác |
| `CONDITIONAL` | Chỉ cần khi chương hoặc nhánh triển khai thực sự dùng đến |
| `LIVE-CHECK` | Dù có snapshot cục bộ vẫn phải kiểm tra nguồn chính thức tại thời điểm viết |
| `RETIRED` | Không còn được dùng làm nguồn chuẩn; chỉ giữ để truy vết lịch sử |

## 4. Phân loại mức độ hỗ trợ của nguồn

Mỗi khẳng định trong bản thảo phải thuộc ít nhất một loại sau:

| Mã | Loại khẳng định | Bằng chứng tối thiểu |
| --- | --- | --- |
| `DEF` | Định nghĩa hoặc đặc tả | Paper gốc, chuẩn hoặc tài liệu chính thức |
| `MATH` | Quan hệ toán học | Sách/paper có uy tín và phép kiểm tra kích thước hoặc thay ngược |
| `TOOL` | Hành vi API/công cụ | Tài liệu đúng phiên bản và test tối thiểu trong dự án |
| `EMP` | Kết quả thực nghiệm | Output thật, cấu hình, seed, split, metric và protocol |
| `DESIGN` | Lựa chọn thiết kế | Lý do, phương án thay thế và trade-off; không trình bày như định lý |
| `CURRENT` | Thông tin có thể thay đổi | Nguồn chính thức được kiểm tra tại ngày viết |
| `LIMIT` | Giới hạn, rủi ro hoặc failure case | Phản ví dụ, tài liệu gốc hoặc test cố ý làm hỏng |

## 5. Registry nguồn nội bộ

### 5.1 Nguồn đang có

| ID | Tệp | Trạng thái | Vai trò được phép | Không được dùng để | Phạm vi chương | Dấu vân tay |
| --- | --- | --- | --- | --- | --- | --- |
| `INT-001` | `book-architecture-v1(1).md` | `ACTIVE` | Nguồn chuẩn về 26 chương, 8 phần, 5 phụ lục, dự án dậm chân xuyên suốt và các quyết định không được tự ý đổi | Chứng minh toán, API hay hiệu quả synthetic-to-real | Toàn sách | SHA-256 `31f899f16ce08196ee011e2e87a76ec71d2dcbbc84ef8da2dda765c815d10e71` |
| `INT-002` | `synthetic-data-writing-guide.md` | `ACTIVE` | Nguồn chuẩn về cấu trúc chương, thuật ngữ, công thức, code, hình, thí nghiệm, Markdown và quy trình duyệt | Thay thế nguồn kỹ thuật chuyên ngành | Toàn sách | SHA-256 `a81986a8873a8326bf8fd04da18dd3615bdf1903d47b45993c29ddf820ab5ce9` |
| `PED-001` | `d2l-en-pytorch.pdf` — Release 0.17.4, 2022 | `ACTIVE` | Tham khảo learning by doing, nhịp giải thích–code–output, triển khai từ đầu rồi dùng API | Làm nguồn chính cho synthetic data, Unity, human model, 3D geometry hoặc API hiện hành | Phương pháp biên soạn; hỗ trợ Ch. 23–25 ở mức nhập môn ML | SHA-256 `cb1af1169a2e4750812feed9058e868a32e6af921b626869815482e661b79ed1` |

### 5.2 Nguồn nội bộ phải bổ sung

| ID | Tệp đề nghị | Trạng thái | Nội dung bắt buộc | Chặn công việc nào nếu thiếu |
| --- | --- | --- | --- | --- |
| `INT-003` | `03-introduction.md` | `KNOWN-MISSING` | Phần giới thiệu đã duyệt và cách định vị cuốn sách | Kiểm tra tính liên tục giữa lời hứa đầu sách và 26 chương |
| `INT-004` | `04-chapter-01.md` | `KNOWN-MISSING` | Mẫu tối thiểu gồm ảnh, binary mask, keypoint, metadata và validator nhãn lệch | Sửa hoặc trích dẫn Chương 1; tái sử dụng output sang Chương 2 |
| `INT-005` | `05-chapter-02.md` | `KNOWN-MISSING` | Bản Chương 2 đã được ghi nhận trong lịch sử dự án; phải xác định bản chuẩn trước khi dùng | Viết Chương 3 dựa trên chính xác lớp `Transform`, quy ước và test của Chương 2 |
| `INT-006` | `06-glossary-and-conventions.md` | `TO-IMPORT` | Hệ trục, tay trái/phải, vector hàng/cột, chiều phép biến đổi, đơn vị, độ/radian, pixel-center, joint naming | Mọi chương có hình học, camera, skeleton hoặc nhãn |
| `INT-007` | `07-research-claims.md` | `TO-IMPORT` | Danh sách giả thuyết, claim được phép, claim cấm và bằng chứng cần có | Ch. 19, 23–26 |
| `INT-008` | `08-experiment-protocol.md` | `TO-IMPORT` | Split, seed, metric, compute/data budget, real-only và held-out real test | Ch. 23–26 |
| `INT-009` | `09-privacy-threat-model.md` | `TO-IMPORT` | Đối thủ, thuộc tính cần bảo vệ, utility cần giữ, cách đo leakage; không đồng nhất silhouette với ẩn danh | Ch. 22 và 26 |
| `PRJ-001` | `ProjectVersion.txt` | `KNOWN-MISSING` | Phiên bản Unity chính xác | Mọi khẳng định `TOOL` về Unity |
| `PRJ-002` | `Packages/manifest.json` và `Packages/packages-lock.json` | `KNOWN-MISSING` | Package và phiên bản thực tế | Chọn đúng tài liệu Unity/Perception/render pipeline |
| `PRJ-003` | `environment-lock.md` hoặc tệp môi trường tương đương | `KNOWN-MISSING` | Python, NumPy, PyTorch, OpenCV, PyTorch3D và nền tảng chạy | Tái tạo code và kết quả |
| `PRJ-004` | `UnityPoseExporter.cs` | `KNOWN-MISSING` | Cách dự án xuất pose | Ch. 9, 15, 20–21 |
| `PRJ-005` | `UnitySynchronizedCapture.cs` | `KNOWN-MISSING` | Thời điểm khóa frame và đồng bộ đầu ra | Ch. 15 và 21 |
| `PRJ-006` | `UnityRecorderBridge.cs` | `KNOWN-MISSING` | Cầu nối ghi video/frame | Ch. 15–16 |
| `PRJ-007` | `validate_unity_capture_pair.py` | `KNOWN-MISSING` | Validator hiện có và invariant đã triển khai | Ch. 20–21 |
| `PRJ-008` | `joint_schema.json` | `KNOWN-MISSING` | Tên, thứ tự, parent và ánh xạ joint | Ch. 4, 8–12, 20–26 |
| `PRJ-009` | `sample_schema.json` | `TO-IMPORT` | Hợp đồng ảnh–nhãn–camera–motion–provenance | Ch. 1, 8, 13, 15, 20 |
| `PRJ-010` | Bộ mẫu đúng/sai tối thiểu | `TO-IMPORT` | 2–3 mẫu đúng và các mutant lệch nhãn, lệch frame, sai camera, thiếu tệp | Ch. 1, 15, 20–22 |

## 6. Registry nguồn ngoài

### 6.1 Hình học, camera và rendering

| ID | Nguồn | Trạng thái | Dùng để hỗ trợ | Không được suy diễn | Chương |
| --- | --- | --- | --- | --- | --- |
| `GEO-001` | Kevin M. Lynch, Frank C. Park, *Modern Robotics: Mechanics, Planning, and Control* — https://hades.mech.northwestern.edu/images/7/7f/MR.pdf | `TO-IMPORT` | Hệ quy chiếu, rigid-body motion, rotation, homogeneous transform, forward kinematics | Mọi nội dung robotics/control ngoài phạm vi cuốn sách | 2–4; Phụ lục A–B |
| `GEO-002` | Richard Szeliski, *Computer Vision: Algorithms and Applications*, 2nd ed. — https://szeliski.org/Book/ | `TO-IMPORT` | Image formation, camera model, projection, warping, calibration và xử lý ảnh | API OpenCV/Unity hiện hành hoặc kết quả của dự án | 5–8, 23; Phụ lục A–B |
| `GEO-003` | OpenCV `calib3d` — https://docs.opencv.org/ | `PIN-VERSION` `LIVE-CHECK` | Công thức và API calibration, projection, distortion của phiên bản dự án | Quy ước Unity hoặc PyTorch3D | 5–7, 20 |
| `GEO-004` | Unity Manual: coordinate system, Transform, Quaternion/Euler | `PIN-VERSION` `LIVE-CHECK` | Quy ước và hành vi Unity đúng phiên bản | Chân lý chung về hệ trục hoặc phép quay | 2–5, 9–15; Phụ lục B–C |
| `GEO-005` | Unity Camera API: projection matrix, `WorldToScreenPoint`, viewport/screen coordinates | `PIN-VERSION` `LIVE-CHECK` | Kết quả API cần đối chiếu với phép chiếu tự viết | Quy ước pixel của OpenCV hoặc COCO | 5–8, 14–15, 20 |
| `GEO-006` | PyTorch3D Cameras — https://pytorch3d.org/docs/cameras | `PIN-VERSION` `LIVE-CHECK` | World/view/NDC/screen conventions khi đối chiếu tensor pipeline | Quy ước Unity hoặc OpenCV | 5–8, 23 |
| `GEO-007` | Matt Pharr et al., *Physically Based Rendering*, 4th ed. — https://pbr-book.org/4ed/ | `CONDITIONAL` | Camera, sampling, light/material và failure modes của rendering | Biến sách thành giáo trình rendering đầy đủ; suy ra ảnh đẹp sẽ tăng downstream accuracy | 7, 14, 19 |

### 6.2 Biểu diễn cơ thể và chuyển động

| ID | Nguồn | Trạng thái | Dùng để hỗ trợ | Không được suy diễn | Chương |
| --- | --- | --- | --- | --- | --- |
| `HUM-001` | Loper et al., *SMPL: A Skinned Multi-Person Linear Model* — https://smpl.is.tue.mpg.de/ | `TO-IMPORT` | Pose, shape, joints, skinning và pose-dependent deformation trong SMPL | SMPL là biểu diễn con người duy nhất hoặc phù hợp mọi use case | 9–10; Phụ lục D |
| `HUM-002` | Pavlakos et al., *Expressive Body Capture: 3D Hands, Face, and Body from a Single Image* — https://arxiv.org/abs/1904.05866 | `TO-IMPORT` | Phạm vi và cấu trúc SMPL-X; khác biệt body/hand/face | Dự án bắt buộc phải dùng SMPL-X | 9–10; Phụ lục D |
| `HUM-003` | Mahmood et al., *AMASS: Archive of Motion Capture as Surface Shapes* — https://arxiv.org/abs/1904.03278 | `TO-IMPORT` | Chuẩn hóa nhiều nguồn mocap vào một body model, motion và rig nhất quán | Mọi motion trong AMASS phù hợp động tác quân đội hoặc có giấy phép phân phối lại | 9–12, 17 |
| `HUM-004` | von Marcard et al., *3D Poses in the Wild (3DPW)* — https://virtualhumans.mpi-inf.mpg.de/3DPW/ | `TO-IMPORT` | Dataset thật có camera động, pose/body và protocol tham khảo | 3DPW tự động là test set đúng cho bài toán dậm chân | 11, 21, 23–25 |
| `HUM-005` | Ionescu et al., *Human3.6M* — https://vision.imar.ro/human3.6m/ | `CONDITIONAL` | Protocol và metric 3D pose trong môi trường kiểm soát | Khả năng tổng quát sang bối cảnh thật hoặc động tác quân đội | 23–25 |
| `HUM-006` | Shin et al., *WHAM: Reconstructing World-grounded Humans with Accurate 3D Motion* — https://arxiv.org/abs/2312.07531 | `TO-IMPORT` | World-grounded motion, camera motion, contact-aware refinement và failure modes liên quan | WHAM là ground truth cho video thật hoặc chắc chắn chạy đúng trên silhouette | 11–12, 21, 23, 26 |

### 6.3 Synthetic human và bộ sinh dữ liệu

| ID | Nguồn | Trạng thái | Dùng để hỗ trợ | Không được suy diễn | Chương |
| --- | --- | --- | --- | --- | --- |
| `SYN-001` | Varol et al., *Learning from Synthetic Humans (SURREAL)* — https://arxiv.org/abs/1701.01370 | `TO-IMPORT` | Pipeline sinh RGB/video cùng pose, depth, segmentation và các nhãn dày đặc | Kết quả SURREAL sẽ lặp lại trên task, engine hoặc protocol của dự án | 1, 8, 10–11, 19, 24 |
| `SYN-002` | Borkman et al., *Unity Perception* — https://arxiv.org/abs/2107.04259 | `TO-IMPORT` | Labeler, randomizer, synthetic-data tooling và cấu trúc pipeline trong Unity | Package hiện hành hoặc phù hợp trực tiếp với phiên bản Unity của dự án | 8, 13–16, 20 |
| `SYN-003` | Ebadi et al., *PeopleSansPeople* — https://arxiv.org/abs/2112.09290 | `TO-IMPORT` | Generator human-centric, camera/light/asset parameterization, COCO pose labels và protocol synthetic pretraining | Mức tăng metric trong paper sẽ áp dụng cho bài toán kỹ năng động tác | 8, 13–15, 19, 24–25 |
| `SYN-004` | Patel et al., *AGORA* — https://arxiv.org/abs/2104.14643 | `TO-IMPORT` | Crowd, occlusion, diversity, clothed scans, SMPL-X ground truth và đánh giá nhóm khó | Photorealism tự nó gây ra downstream improvement | 7, 9–10, 14, 17, 19, 22 |
| `SYN-005` | Black et al., *BEDLAM* — https://arxiv.org/abs/2306.16940 | `TO-IMPORT` | Body, motion, clothing, hair, scene, lighting và camera diversity | Asset hoặc dữ liệu được phép phân phối lại ngoài license | 10–11, 14, 17–19, 22–25 |
| `SYN-006` | Tesch et al., *BEDLAM 2.0: Synthetic Humans and Cameras in Motion* — https://arxiv.org/abs/2511.14394 | `TO-IMPORT` | Camera động, world coordinates, body/motion/clothing/environment diversity | Dataset mới hơn mặc nhiên tốt hơn cho task của dự án | 11, 14, 19, 21–25 |

### 6.4 Thiết kế biến thể và sim-to-real

| ID | Nguồn | Trạng thái | Dùng để hỗ trợ | Không được suy diễn | Chương |
| --- | --- | --- | --- | --- | --- |
| `SIM-001` | Tobin et al., *Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World* — https://arxiv.org/abs/1703.06907 | `TO-IMPORT` | Giả thuyết và một minh chứng sớm của domain randomization | Randomization càng rộng càng tốt hoặc chắc chắn chuyển được sang task này | 17–19, 24–25 |
| `SIM-002` | Tremblay et al., *Training Deep Networks with Synthetic Data: Bridging the Reality Gap by Domain Randomization* — https://arxiv.org/abs/1804.06516 | `TO-IMPORT` | Randomization cho detection và cách tổ chức thí nghiệm synthetic-to-real | Kết quả detection áp dụng trực tiếp cho pose/motion/skill scoring | 17–19, 24–25 |
| `SIM-003` | NIST/SEMATECH, *e-Handbook of Statistical Methods* — https://www.itl.nist.gov/div898/handbook/ | `TO-IMPORT` | Factorial design, blocking, sampling và phân tích thí nghiệm | Thay thế protocol ML hoặc quyết định domain-specific | 17–18, 25; Phụ lục A |
| `SIM-004` | SciPy Quasi-Monte Carlo documentation — https://docs.scipy.org/doc/scipy/reference/stats.qmc.html | `PIN-VERSION` `LIVE-CHECK` | API Latin hypercube/Sobol khi triển khai sampling plan | Bảo đảm coverage theo ngữ nghĩa task nếu chưa định nghĩa metric | 18 |

### 6.5 Schema, QA, tái tạo và báo cáo

| ID | Nguồn | Trạng thái | Dùng để hỗ trợ | Không được suy diễn | Chương |
| --- | --- | --- | --- | --- | --- |
| `QA-001` | Gebru et al., *Datasheets for Datasets* — https://arxiv.org/abs/1803.09010 | `TO-IMPORT` | Câu hỏi về motivation, composition, collection/generation, use và maintenance | Datasheet hoàn chỉnh đồng nghĩa dataset đúng hoặc không thiên lệch | 13, 20–22, 26 |
| `QA-002` | Pushkarna et al., *Data Cards* — https://arxiv.org/abs/2204.01075 | `TO-IMPORT` | Tài liệu hóa dataset hướng theo stakeholder và lifecycle | Thay thế kiểm tra kỹ thuật của dataset | 22, 26 |
| `QA-003` | Mitchell et al., *Model Cards for Model Reporting* — https://arxiv.org/abs/1810.03993 | `TO-IMPORT` | Intended use, limitations và subgroup evaluation của model | Một model card tự nó chứng minh model an toàn hoặc công bằng | 23–26 |
| `QA-004` | Pineau et al., *Improving Reproducibility in Machine Learning Research* — https://arxiv.org/abs/2003.12206 | `TO-IMPORT` | Báo cáo code, data, environment, model selection và experimental conditions | Seed cố định bảo đảm bitwise reproducibility trên mọi máy | 13, 16, 23–26 |
| `QA-005` | NeurIPS Paper Checklist — https://neurips.cc/public/guides/PaperChecklist | `LIVE-CHECK` | Checklist hiện hành cho claim, limit, reproducibility và assets | Thay thế yêu cầu cụ thể của venue hoặc kiểm định nội bộ | 25–26 |
| `QA-006` | COCO dataset/API/evaluator — https://cocodataset.org/ và https://github.com/cocodataset/cocoapi | `PIN-VERSION` `LIVE-CHECK` | Keypoint order, visibility, annotation format, OKS/evaluation implementation | COCO convention là định nghĩa giải phẫu duy nhất hoặc metric đúng cho skill scoring | 8–9, 20, 23–25; Phụ lục D |
| `QA-007` | Unity Perception SOLO schema — https://docs.unity3d.com/Packages/com.unity.perception%401.0/manual/Schema/SoloSchema.html | `PIN-VERSION` | Một thiết kế tham khảo cho sensor capture, annotation và metric | Schema dự án phải sao chép SOLO hoặc legacy schema vẫn là format hiện hành | 8, 13, 15, 20; Phụ lục D |
| `QA-008` | PyTorch reproducibility notes — https://docs.pytorch.org/docs/stable/notes/randomness.html | `PIN-VERSION` `LIVE-CHECK` | Nguồn ngẫu nhiên, deterministic operations và giới hạn tái tạo | Cùng seed luôn cho kết quả giống hệt qua version/platform | 16, 23–25 |
| `QA-009` | Scikit-learn common pitfalls/cross-validation — https://scikit-learn.org/stable/common_pitfalls.html | `PIN-VERSION` `LIVE-CHECK` | Data leakage, preprocessing và group-aware splitting ở mức tham khảo | Thay thế split theo identity–motion–scene được thiết kế riêng | 22–25 |

### 6.6 Quyền riêng tư và giới hạn sử dụng

| ID | Nguồn | Trạng thái | Dùng để hỗ trợ | Không được suy diễn | Chương |
| --- | --- | --- | --- | --- | --- |
| `PRV-001` | Chao et al., *GaitSet: Regarding Gait as a Set for Cross-View Gait Recognition* — https://aaai.org/papers/08126-gaitset-regarding-gait-as-a-set-for-cross-view-gait-recognition/ | `TO-IMPORT` | Bằng chứng rằng silhouette theo thời gian vẫn có thể chứa tín hiệu nhận dạng dáng đi | Mọi silhouette chắc chắn nhận dạng được một người cụ thể trong deployment này | 22, 26 |
| `PRV-002` | NIST De-identification — https://www.nist.gov/itl/tted/deidentification | `TO-IMPORT` `LIVE-CHECK` | De-identification là tập hợp kỹ thuật có privacy–utility trade-off, không phải trạng thái tuyệt đối | Tuân thủ pháp luật Việt Nam hoặc chứng nhận ẩn danh cho dataset cụ thể | 22, 26 |
| `PRV-003` | NIST Privacy Framework — https://www.nist.gov/privacy-framework | `CONDITIONAL` `LIVE-CHECK` | Khung nhận diện và quản lý privacy risk | Ý kiến pháp lý hoặc tiêu chuẩn bắt buộc cho dự án | 22, 26 |

## 7. Ma trận nguồn theo 26 chương

`P` là nguồn chính; `S` là nguồn hỗ trợ; `I` là output nội bộ bắt buộc phải có trước khi coi chương hoàn chỉnh.

| Chương | Nguồn chính `P` | Nguồn hỗ trợ `S` | Output nội bộ `I` |
| ---: | --- | --- | --- |
| 1 | `INT-001`, `INT-002`, `INT-004` | `SYN-001`, `QA-001` | `PRJ-009`, mẫu ảnh–mask–keypoint–metadata và validator nhãn lệch |
| 2 | `GEO-001`, `INT-006` | `GEO-004` | Lớp điểm mang hệ/đơn vị/vai trò; test round-trip và test từ chối trộn hệ |
| 3 | `GEO-001`, `INT-006` | `GEO-004` | `Transform3D`, test thứ tự phép biến đổi, độ/radian và Unity↔NumPy |
| 4 | `GEO-001`, `HUM-003` | `HUM-001` | Skeleton tree, forward kinematics, bone-length invariant và cycle/parent tests |
| 5 | `GEO-002`, `GEO-003` | `GEO-005`, `GEO-006` | Hàm pinhole projection tự viết và đối chiếu engine |
| 6 | `GEO-002`, `GEO-003` | `GEO-005` | Chuỗi crop–resize–pad–distortion dùng chung cho ảnh và nhãn |
| 7 | `GEO-002`, `GEO-007` | `SYN-004`, `GEO-005` | Ba cảnh `visible`/`occluded`/`outside` và depth checks |
| 8 | `SYN-001`, `SYN-002`, `SYN-003` | `QA-006`, `QA-007` | Gói RGB/mask/depth/segmentation/keypoint/box cùng `sample_id` |
| 9 | `HUM-001`, `HUM-002`, `HUM-003` | `QA-006` | `PRJ-008` và bảng ánh xạ rig–project–model |
| 10 | `HUM-001`, `HUM-002` | `SYN-004`, `SYN-005` | Ví dụ LBS tối giản, kiểm tra skin weights và identity continuity |
| 11 | `HUM-003`, `HUM-004` | `HUM-006`, `SYN-006` | Clip retarget/resample; bone length, root, duration và contact checks |
| 12 | `HUM-003`, `HUM-006` | `INT-007` | Cặp motion đúng/sai chỉ khác một can thiệp; phase/angle/contact labels |
| 13 | `SYN-002`, `QA-001`, `QA-004` | `INT-001` | Scene recipe, asset manifest, seed policy, code/environment provenance |
| 14 | `SYN-003`, `SYN-004`, `SYN-005`, `SYN-006` | `GEO-007` | Cảnh tham số hóa với 12 camera và constraint checks |
| 15 | `SYN-002`, `QA-007`, `PRJ-005` | `PRJ-004`, `PRJ-006` | Capture barrier và sample nguyên tử; test cố ý lệch một frame |
| 16 | `QA-004`, `QA-008` | Tài liệu runtime đúng phiên bản | Batch manifest, idempotent retry, checkpoint, checksum và interruption test |
| 17 | `SIM-001`, `SIM-002` | `HUM-003`, `SYN-004`–`SYN-006` | Đặc tả phân bố target có miền, đơn vị, phụ thuộc và lý do |
| 18 | `SIM-003`, `SIM-004` | `SIM-001` | Sampling plan có budget, seed, constraint và coverage report |
| 19 | `SIM-001`, `SIM-002` | `SYN-001`, `SYN-003`–`SYN-006`, `GEO-007` | Ba cấu hình sim-to-real chỉ khác chiến lược và ablation plan |
| 20 | `PRJ-007`, `PRJ-009` | `QA-006`, `QA-007` | Validator mẫu, diagnostic overlays, golden samples và mutants |
| 21 | `HUM-006`, `SYN-006` | `HUM-004`, `PRJ-005` | Sequence QA cho timestamp, frame order, foot slide, identity và camera pose |
| 22 | `QA-001`, `QA-002`, `QA-009` | `PRV-001`, `PRV-002` | Dataset QA, duplicate/leakage/coverage report và group split |
| 23 | `PED-001`, `QA-004`, `INT-008` | `HUM-004`, `HUM-005`, `QA-006`, `QA-008` | Real-only baseline, held-out real test, logs, seeds và checkpoint |
| 24 | `INT-008`, `SYN-003`, `QA-004` | `SIM-001`, `SIM-002` | Bốn run budget-matched: synthetic-only, mixed, pretrain–fine-tune, curriculum |
| 25 | `SIM-003`, `QA-004`, `QA-005` | `QA-003`, `SYN-005`, `SYN-006` | Ablation, multi-seed uncertainty, subgroup slices, failure gallery và cost–benefit |
| 26 | `INT-001`, `INT-007`–`INT-009`, toàn bộ output Ch. 1–25 | `HUM-006`, `PRV-001`–`PRV-003`, `QA-001`–`QA-005` | Generator, dataset card, QA, baseline, ablation, privacy limits và reproduction package |

## 8. Ánh xạ phụ lục

| Phụ lục | Nguồn bắt buộc |
| --- | --- |
| A. Toán vừa đủ dùng | `GEO-001`, `GEO-002`, `SIM-003`; chỉ các phần thực sự được chương chính gọi đến |
| B. Bảng quy ước và chuyển đổi | `INT-006`, `GEO-003`–`GEO-006`, `QA-006`, `PRJ-008` |
| C. Ánh xạ từ khái niệm sang công cụ | `PRJ-001`–`PRJ-003` và snapshot tài liệu đúng phiên bản |
| D. Schema, định dạng và giấy phép | `PRJ-009`, `QA-006`, `QA-007` và license đi kèm `HUM-*`, `SYN-*` |
| E. Từ điển và chỉ mục lỗi | `INT-002`, `INT-006` và registry failure case tích lũy từ mỗi chương |

## 9. Khi nào phải kiểm tra Internet

### 9.1 Bắt buộc kiểm tra lại

- Phiên bản Unity, render pipeline, Perception package và API camera.
- Phiên bản NumPy, PyTorch, OpenCV, PyTorch3D, SciPy và scikit-learn.
- Schema hoặc evaluator đang được một dự án chính thức duy trì.
- Trạng thái repository, model release, dataset release và benchmark mới.
- License, điều kiện truy cập, quyền phân phối asset/model/dataset.
- Checklist hoặc quy định hiện hành của venue.
- Mọi khẳng định dùng từ “hiện tại”, “mới nhất”, “đang hỗ trợ” hoặc tương đương.

### 9.2 Không cần tìm lại nếu nguồn đã đủ

- Định nghĩa toán ổn định đã có trong `GEO-001` hoặc `GEO-002` và được kiểm tra bằng ví dụ số.
- Mục tiêu, phạm vi và kiến trúc đã có trong `INT-001`.
- Quy chuẩn viết, hình, code và kiểm chứng đã có trong `INT-002`.
- Hành vi của chính code dự án khi đã có code, environment lock, input, output và test tái tạo.

### 9.3 Snapshot tài liệu công cụ

Mỗi snapshot tài liệu công cụ phải ghi:

- tên công cụ/package;
- phiên bản chính xác;
- URL gốc;
- ngày truy cập;
- trang hoặc mục đã lưu;
- file cấu hình dự án chứng minh phiên bản tương ứng;
- trạng thái `LIVE-CHECK` nếu thông tin có thể thay đổi.

Không được lấy snapshot của “phiên bản mới nhất” rồi áp vào một project cũ chưa xác định phiên bản.

## 10. Quy tắc trích dẫn trong bản thảo

1. ID trong source map chỉ dùng để quản lý nội bộ; bản xuất bản phải ghi tác giả, tên, năm và liên kết/DOI đọc được.
2. Trích dẫn đặt gần claim mà nó hỗ trợ, không gom toàn bộ cuối chương rồi để người đọc tự đoán.
3. Claim `EMP` phải kèm dataset, model, metric và protocol; không chỉ ghi một con số tốt hơn.
4. Claim về paper không được viết thành kết quả của dự án nếu chưa tái lập.
5. Hình lấy trực tiếp phải tuân license và ghi nguồn; hình dựng lại phải ghi “dựng lại từ”.
6. Không dùng một survey để thay paper gốc nếu paper gốc đã có.
7. Không dùng D2L làm nguồn nội dung synthetic data chỉ vì văn phong của sách được tham khảo từ D2L.
8. Nếu nguồn chỉ hỗ trợ trực giác, đoạn sau vẫn phải có định nghĩa, phép tính, code, thí nghiệm hoặc phản ví dụ.

## 11. Quy tắc giấy phép và dữ liệu

- Chỉ nạp bản sách, paper, code hoặc asset được tải hợp pháp và được phép dùng trong môi trường cá nhân/nghiên cứu tương ứng.
- Không phân phối lại PDF sách chỉ được cấp cho personal use.
- Với SMPL, SMPL-X, AMASS, AGORA, BEDLAM và các asset thương mại, lưu cả license/terms tại thời điểm tải.
- Paper, README và license thường đủ làm nguồn cho sách; không nạp model weights, mesh, video hoặc toàn dataset nếu chương không cần chạy chúng.
- Không suy ra quyền thương mại từ quyền dùng nghiên cứu.
- Không coi dữ liệu tổng hợp tự động hết rủi ro bản quyền, quyền đối với asset, thiên lệch hay quyền riêng tư.

## 12. Hàng đợi nhập nguồn

### Đợt 0 — hoàn thiện nguồn chuẩn nội bộ

1. `INT-003`–`INT-006`: introduction, Chương 1, Chương 2 và bảng quy ước.
2. `PRJ-001`–`PRJ-003`: phiên bản Unity, package lock và môi trường Python.
3. `PRJ-004`–`PRJ-010`: code exporter/validator, schema và mẫu đúng/sai.

### Đợt 1 — trước khi tiếp tục Phần II–III

1. `GEO-001`, `GEO-002`.
2. Snapshot đúng phiên bản cho `GEO-003`–`GEO-006`.
3. `QA-006`, `QA-007` nếu Chương 8 sử dụng COCO hoặc Unity Perception/SOLO.

### Đợt 2 — trước Phần IV–V

1. `HUM-001`–`HUM-003`, `HUM-006`.
2. `SYN-001`–`SYN-006`.
3. License và README tương ứng.

### Đợt 3 — trước Phần VI–VIII

1. `SIM-001`–`SIM-004`.
2. `QA-001`–`QA-005`, `QA-008`, `QA-009`.
3. `PRV-001`–`PRV-003`.
4. `INT-007`–`INT-009`: claim registry, experiment protocol và privacy threat model.

## 13. Điều kiện để một phần được phép bắt đầu viết

Một phần chỉ được coi là **source-ready** khi:

- mọi nguồn `P` của các chương trong phần đã là `ACTIVE`, hoặc có lý do rõ vì sao chưa cần;
- tài liệu công cụ đã khớp phiên bản project;
- output nội bộ từ phần trước đã có và đọc được;
- license của asset/model/dataset liên quan đã được lưu;
- claim chính và bằng chứng cần có đã được viết trước;
- chưa có mâu thuẫn chưa giải quyết giữa kiến trúc, chương đã duyệt và code hiện tại.

Nếu chưa đạt, vẫn có thể thiết kế dàn ý hoặc thí nghiệm thăm dò, nhưng không được xuất bản nội dung như một chương hoàn chỉnh.

## 14. Cách cập nhật source map

Khi thêm hoặc thay một nguồn:

1. cấp ID ổn định; không tái sử dụng ID đã bỏ;
2. ghi trạng thái, phiên bản, URL gốc, ngày truy cập và license;
3. ghi rõ nguồn hỗ trợ được loại claim nào;
4. ghi ít nhất một điều nguồn **không** chứng minh;
5. cập nhật ma trận chương và phụ lục;
6. nếu thay đổi nguồn chuẩn nội bộ, ghi lý do và các chương bị ảnh hưởng;
7. tăng version của tệp này nếu thay đổi phạm vi, thứ bậc thẩm quyền hoặc nguồn chính của một phần.

## 15. Kiểm tra nhanh trước mỗi lần viết

- Tôi đang viết claim loại `DEF`, `MATH`, `TOOL`, `EMP`, `DESIGN`, `CURRENT` hay `LIMIT`?
- Nguồn được chọn có thật sự có thẩm quyền cho claim đó không?
- Đây là kết quả của paper, của công cụ hay của chính dự án?
- Phiên bản và quy ước có khớp môi trường hiện tại không?
- Có đang biến một lựa chọn thiết kế thành chân lý không?
- Có đang suy từ ảnh đẹp sang hiệu quả downstream không?
- Có real held-out test để kết luận synthetic-to-real không?
- Có đang gọi silhouette là vô danh mà chưa có threat model và phép đo leakage không?
- Nếu bỏ trích dẫn này, người đọc còn cách nào kiểm tra claim không?
- Nếu chưa đủ bằng chứng, đoạn văn đã nói rõ “chưa đủ căn cứ” chưa?

---

**Nguồn chuẩn điều khiển tệp này:** `INT-001` và `INT-002`. Nếu source map mâu thuẫn với mục tiêu hoặc kiến trúc đã duyệt, phải sửa source map; không được âm thầm sửa mục tiêu của sách.

